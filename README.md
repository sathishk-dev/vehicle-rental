
# 🚗 Vehicle Rental Application

A full-stack vehicle rental application that allows users to browse available vehicles, like their favorites, filter the vehicles and manage their bookings easily. Built using the **MERN stack (MongoDB, Express, React, Node.js)** with seamless integration and user-friendly UI.

Includes a secure **Admin Panel** for managing vehicles, monitoring user activity, and overseeing the overall system.

### 🔗 Live Demo

👉 [Visit the Live App](https://vehicle-rental-gamma.vercel.app/)

---

## 📂 Project Structure

```
/frontend     → React frontend
/server     → Node.js backend with Express
```

---

## 🚀 Features

- 🧑‍💼 User Authentication (Google/JWT Auth)
- 🚘 View all available vehicles
- ❤️ Like & Unlike vehicles (user-based)
- 🔍 Filter and search vehicles
- 📦 Booking management (extendable)
- 🛠️ Admin Panel for vehicle management and monitoring
- 🎨 Responsive and intuitive UI with Tailwind CSS

---

## ⚙️ Technologies Used

- **Frontend:** React, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Deployment:** Vercel (Frontend & Backend)

---

## 🛠️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sathishk-dev/vehicle-rental.git
cd vehicle-rental
```

### 2. Install Dependencies

#### For Backend:
```bash
cd server
npm install
```

#### For Frontend:
```bash
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

Inside the `/server` folder, create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string

CLIENT_URL = "http://localhost:5173"
SERVER_URL = "http://127.0.0.1:3001"

EMAIL = your_email
APP_PASS = get your_email app password

GOOGLE_CLIENT_ID = Your_Google_Client_Id

JWT_ACCESS_KEY = your_access_key
JWT_REFRESH_KEY = your_refress_key
```

Inside the `/frontend` folder, create a `.env` file:

```env
VITE_SERVER_URL = "http://localhost:3001"
VITE_GOOGLE_ID = Your_Google_Id
```


### 🔐 How to Get Google Client ID

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth 2.0 Client ID**.
5. Select **Web application**, and provide a name.
6. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173` (for development)
7. Click **Create** and copy the **Client ID**.
8. Paste it in your `.env` as `VITE_GOOGLE_ID` and `GOOGLE_CLIENT_ID`.

---

### 4. Start the Application

#### Start Backend:
```bash
cd server
npm start
```

#### Start Frontend:
```bash
cd ../frontend
npm run dev
```

Now, navigate to `http://localhost:5173` to view the app locally.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

**Sathish Kumar**  
📧 [LinkedIn](https://www.linkedin.com/in/sathishk-dev)  
🌐 [GitHub Profile](https://github.com/sathishk-dev)

---
