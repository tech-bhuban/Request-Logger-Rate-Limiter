
# Custom Middleware Engine & Rate Limiter

A robust Node.js utility demonstrating advanced Express middleware patterns. This project implements a custom logging system and an in-memory rate-limiting algorithm without relying on third-party libraries.

## 🛠 Advanced Features
- **Custom Rate Limiting**: Implements a sliding-window counter to prevent API abuse based on IP tracking.
- **Persistent Logging**: Uses Node.js `fs.createWriteStream` to log every incoming request to a local `access.log` file.
- **Middleware Pipeline**: Showcases how to pass control through multiple custom logic layers before reaching the route handler.
- **Manual Data Streams**: Efficiently handles file I/O using streams to ensure the server remains performant under load.

## 🚀 Getting Started
1. **Clone the repo**:
   ```bash
   git clone <your-repo-url>
   ```
2. **Install Express**:
   ```bash
   npm install express
   ```
3. **Run the server**:
   ```bash
   node server.js
   ```

## 📊 How to Test
- Refresh the home page rapidly. After 10 attempts, you will trigger the **429 Too Many Requests** error.
- Visit `/logs` to see the live history of your interactions recorded on the server.

## 📜 Technical Choices
I chose to implement the rate limiter manually using a JavaScript object hash map to demonstrate an understanding of time-complexity and memory management within a Node.js process.

## License
MIT

