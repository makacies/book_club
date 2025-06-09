use axum::{
    routing::get,
    Router,
};
use tower_http::services::ServeDir;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    // Create a router that serves static files from the "static" directory
    let app = Router::new()
        .nest_service("/", ServeDir::new("static"));

    // Define the address to listen on
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    
    println!("📚 Book Club server starting...");
    println!("🌐 Serving at http://localhost:3000");
    println!("📁 Static files from: ./static/");
    println!("Press Ctrl+C to stop the server");

    // Start the server
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
