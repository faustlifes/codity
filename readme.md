# 🚀 CODITY

> A private collection of various coding tasks I’ve solved during different technical interviews — sourced from **LeetCode**, **Codility**, and other resources.

---

## 🧩 Overview

This project contains multiple algorithmic problems and their solutions, categorized by difficulty levels and source platforms.

---

## ⚙️ Getting Started

Follow these simple steps to set up and run the project locally:

```bash
  # 1️⃣ Install all required dependencies
    npm install

  # 2️⃣ Start the application
    npm start
```

Once the app is running, you’ll be prompted with:

```bash
  Please enter No of lesson (e.g. 1):
```
# 📚 Available Tasks

| Task Name      | Description                                             |
| -------------- | ------------------------------------------------------- |
| `cl1`          | Codility Level 1 tasks                                  |
| `cl2`          | Codility Level 2 tasks                                  |
| `cl3`          | Codility Level 3 tasks                                  |
| `cl4`          | Codility Level 4 tasks                                  |
| `cl5`          | Codility Level 5 tasks                                  |
| `cl6`          | Codility Level 6 tasks                                  |
| `cl7`          | Codility Level 7 tasks                                  |
| `lt`           | LeetCode lessons (e.g., `lt.1`, `lt.5`, `lt.100`, etc.) |
| `quickSearch`  | Quick search example (1 solution)                       |
| `divideImpera` | Divide & Conquer example (1 solution)                   |
| `maxWaterArea` | Task about calculating max water area                   |
| `bsrc`         | Binary search lesson example                            |
| `ap`           | Task about dividing apples among children               |


# 🧠 Configuration

You can configure the app to run specific lessons or modes in the `config.js` file (found in the `template` folder).

### Example configuration:

```json
  {
    "mode": "config",
    "lessons": ["lt.1(params...)"]
  }
```
> 💡 Tip:
When passing string parameters (either in config or the shell), wrap them in backticks (``` `  ```).

### Example with parameters:

```bash
  lt.1(`str`, 1234, true)
```

# 📜 License

This project is licensed under the MIT License.
Feel free to clone, explore, and learn from my coding interview experience!