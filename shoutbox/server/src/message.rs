extern crate serde;
extern crate serde_json;

use serde_derive::{Serialize, Deserialize};

#[derive(Serialize,Deserialize)]
pub struct ChatMessage {
    from: String,
    time: String,
    message: String
}
