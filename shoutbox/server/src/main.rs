extern crate env_logger;
extern crate ws;
extern crate serde;
extern crate serde_json;

use serde_derive::{Serialize, Deserialize};

mod message;

use message::ChatMessage;
use std::cell::Cell;
use std::rc::Rc;

use ws::{listen, CloseCode, Error, Handler, Handshake, Message, Result, Sender};

struct Server {
    out: Sender,
    count: Rc<Cell<usize>>,
    users: Rc<Vec<String>>,
    messages: Rc<Vec<ChatMessage>>,
}

#[derive(Serialize, Debug)]
struct Count {
    user_count: usize
}

impl Handler for Server {
    fn on_open(&mut self, _: Handshake) -> Result<()> {
        let msg = match serde_json::to_string(&Count {
            user_count: self.count.get() + 1
        }) {
            Ok(res) => res,
            Err(_) => panic!("Something went horribly wrong")
        };
        self.out.broadcast(Message::Text(msg));
        Ok(self.count.set(self.count.get() + 1))
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {
        match msg.clone().into_text() {
            Ok(text) => {
                self.out.broadcast(Message::Text(text))
            },
            Err(_) => {
                println!("Error!");
                self.out.send(Message::Text(String::from("Error!")))
            }
        }
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal => println!("The client is done with the connection"),
            CloseCode::Away => println!("The client left the site"),
            _ => println!("Error {}", reason),
        }

        self.count.set(self.count.get() - 1)
    }

    fn on_error(&mut self, err: Error) {
        println!("Error on serverside! {:?}", err);
        self.count.set(self.count.get() - 1)
    }
}

fn main() {
    // Setup logging
    env_logger::init();

    let count = Rc::new(Cell::new(0));
    let users = Rc::new(Vec::new());
    let messages = Rc::new(Vec::new());
    listen("127.0.0.1:2345", |out| Server {
        out: out,
        count: count.clone(),
        users: users.clone(),
        messages: messages.clone(),
    })
    .unwrap();
}
