const mongoose = require('mongoose');

// Function to get Sri Lanka Standard Time (UTC+5:30)
const getSriLankaTime = () => {
  const now = new Date();
  // Convert to Sri Lanka time (UTC+5:30)
  const srilankTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return srilankTime;
};

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
}, { 
  timestamps: {
    currentTime: () => getSriLankaTime()
  }
});

// Saved document in MongoDB with Sri Lanka Time:
// {
//   "_id": ObjectId("67a1b2c3d4e5f6g7h8i9j0k1"),
//   "title": "Learn React",
//   "description": "Complete tutorial",
//   "date": ISODate("2024-12-25"),
//   "status": "pending",
//   "createdAt": ISODate("2024-12-15T15:45:30.000Z"), // Sri Lanka Time
//   "updatedAt": ISODate("2024-12-15T15:45:30.000Z")   // Sri Lanka Time
// }

module.exports = mongoose.model('Todo', todoSchema);
