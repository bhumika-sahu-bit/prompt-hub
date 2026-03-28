// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Add this after app.use(express.json());
// // app.use(express.json({ limit: '50mb' }));
// // app.use(express.urlencoded({ limit: '50mb', extended: true }));


// // console.log('🚀 Starting server...');

// // // MongoDB Connection - FIXED ✅
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prompthub')
// //   .then(() => console.log('✅ MongoDB Connected'))
// //   .catch(err => console.log('❌ MongoDB Error:', err.message));

// // // Prompt Schema
// // const promptSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   prompt: { type: String, required: true },
// //   imageUrl: String,
// //   likes: { type: Number, default: 0 },
// //   createdAt: { type: Date, default: Date.now }
// // });

// // const Prompt = mongoose.model('Prompt', promptSchema);

// // // Routes
// // app.get('/api/prompts', async (req, res) => {
// //   try {
// //     const prompts = await Prompt.find().sort({ createdAt: -1 }).limit(20);
// //     res.json(prompts);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.post('/api/prompts', async (req, res) => {
// //   try {
// //     const prompt = new Prompt(req.body);
// //     await prompt.save();
// //     res.status(201).json(prompt);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // app.patch('/api/prompts/:id/like', async (req, res) => {
// //   try {
// //     const prompt = await Prompt.findByIdAndUpdate(
// //       req.params.id,
// //       { $inc: { likes: 1 } },
// //       { new: true }
// //     );
// //     res.json(prompt);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();

// // ✅ CRITICAL: body-parser LIMITS FIRST (before CORS)
// app.use(express.json({ 
//   limit: '100mb',
//   strict: false 
// }));
// app.use(express.urlencoded({ 
//   limit: '100mb', 
//   extended: true 
// }));

// // ✅ CORS AFTER body-parser
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

// console.log('🚀 Starting server...');

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prompthub')
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ MongoDB Error:', err.message));

// // Prompt Schema
// const promptSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   prompt: { type: String, required: true },
//   imageUrl: String,
//   likes: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now }
// });

// const Prompt = mongoose.model('Prompt', promptSchema);

// // Routes
// app.get('/api/prompts', async (req, res) => {
//   try {
//     const prompts = await Prompt.find().sort({ createdAt: -1 }).limit(20);
//     res.json(prompts);
//   } catch (error) {
//     console.error('GET error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/prompts', async (req, res) => {
//   try {
//     console.log('📤 Payload size:', JSON.stringify(req.body).length / 1024 / 1024, 'MB');
//     console.log('📤 Title:', req.body.title?.substring(0, 50));
    
//     const prompt = new Prompt(req.body);
//     await prompt.save();
//     console.log('✅ SAVED:', prompt._id);
//     res.status(201).json(prompt);
//   } catch (error) {
//     console.error('❌ POST error:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// app.patch('/api/prompts/:id/like', async (req, res) => {
//   try {
//     const prompt = await Prompt.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );
//     res.json(prompt);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   name: String,
//   googleId: String,
//   likedPrompts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' }],
//   createdAt: { type: Date, default: Date.now }
// });
// const User = mongoose.model('User', userSchema);

// // Login Routes
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, name, googleId } = req.body;
//     let user = await User.findOne({ email });
    
//     if (!user) {
//       user = new User({ email, name, googleId });
//       await user.save();
//     }
    
//     // Generate simple token (production mein JWT use karo)
//     const token = Buffer.from(`${user._id}:${email}`).toString('base64');
    
//     res.json({ 
//       user: { id: user._id, email: user.email, name: user.name },
//       token 
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Check auth
// app.get('/api/auth/me', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'No token' });
    
//     const decoded = Buffer.from(token, 'base64').toString();
//     const [userId] = decoded.split(':');
//     const user = await User.findById(userId);
    
//     if (!user) return res.status(401).json({ error: 'Invalid token' });
//     res.json(user);
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

// // Like endpoint - Auth protected
// app.patch('/api/prompts/:id/like', async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'Auth required' });
    
//     const decoded = Buffer.from(token, 'base64').toString();
//     const [userId] = decoded.split(':');
//     const user = await User.findById(userId);
    
//     if (!user) return res.status(401).json({ error: 'User not found' });
    
//     const prompt = await Prompt.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );
    
//     // Add to user liked prompts
//     if (!user.likedPrompts.includes(req.params.id)) {
//       user.likedPrompts.push(req.params.id);
//       await user.save();
//     }
    
//     res.json(prompt);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


// // ERROR HANDLER - LAST
// app.use((error, req, res, next) => {
//   if (error.type === 'entity.too.large') {
//     return res.status(413).json({ error: 'Payload too large. Max 100MB.' });
//   }
//   console.error('🚨 Global error:', error);
//   res.status(500).json({ error: 'Server error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ CORS PERFECT - Handle ALL methods + preflight
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }
  next();
});

// ✅ Body parser AFTER CORS
app.use(express.json({ limit: '100mb', strict: false }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

console.log('🚀 Starting server...');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prompthub')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

// Schemas
const promptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  imageUrl: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  googleId: String,
  likedPrompts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' }],
  createdAt: { type: Date, default: Date.now }
});

const Prompt = mongoose.model('Prompt', promptSchema);
const User = mongoose.model('User', userSchema);

// Routes
app.get('/api/prompts', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 }).limit(20);
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.post('/api/prompts', async (req, res) => {
//   try {
//     console.log('📤 Saving:', req.body.title);
//     const prompt = new Prompt(req.body);
//     await prompt.save();
//     console.log('✅ Saved:', prompt._id);
//     res.status(201).json(prompt);
//   } catch (error) {
//     console.error('❌ Save error:', error);
//     res.status(400).json({ error: error.message });
//   }
// });
app.post('/api/prompts', async (req, res) => {
  try {
    console.log('📤 Saving:', req.body.title);

    const data = req.body;
    delete data._id;   // 🔥 important fix

    const prompt = new Prompt(data);
    await prompt.save();

    console.log('✅ Saved:', prompt._id);
    res.status(201).json(prompt);
    console.log(req.body);
  } catch (error) {
    console.error('❌ Save error:', error);
    res.status(400).json({ error: error.message });
  }
});



// ✅ FIXED LIKE ENDPOINT - PATCH + Auth
app.patch('/api/prompts/:id/like', async (req, res) => {
  try {
    console.log('❤️ PATCH /like:', req.params.id);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');
    
    // Update prompt likes
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    // Update user liked prompts
    const user = await User.findById(userId);
    if (user && !user.likedPrompts.includes(req.params.id)) {
      user.likedPrompts.push(req.params.id);
      await user.save();
    }

    console.log('✅ LIKE SUCCESS:', prompt.likes);
    res.json(prompt);
    
  } catch (error) {
    console.error('❌ Like error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ FAVORITES ROUTE
app.get('/api/users/favorites', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Auth required' });

    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');
    const user = await User.findById(userId).populate('likedPrompts');

    if (!user) return res.status(401).json({ error: 'User not found' });
    
    console.log('⭐ Favorites fetched:', user.likedPrompts.length);
    res.json(user.likedPrompts);
  } catch (error) {
    console.error('Favorites error:', error);
    res.status(400).json({ error: error.message });
  }
});


app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({ email, name });
      await user.save();
      console.log('👤 New user:', email);
    }
    
    const token = Buffer.from(`${user._id}:${email}`).toString('base64');
    console.log('🔐 Login success:', email);
    
    res.json({ 
      user: { id: user._id, email: user.email, name: user.name },
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');
    const user = await User.findById(userId);
    
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
