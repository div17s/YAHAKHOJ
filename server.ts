import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { createServer } from 'vite';

async function startServer() {
  const app = express();

  // 1. Security Headers - Temporarily disabled
  // app.use(helmet()); 
  
  // 2. Strict CORS - Temporarily disabled
  // app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'https://ais-dev-735sysovptq5mmfq3b6owx-744800743425.asia-east1.run.app' })); 
  
  app.use(express.json({ limit: '10kb' }));

  // 3. Rate Limiting (Brute-force protection)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: 'Too many requests, please try again later.'
  });
  app.use('/api/', limiter);

  // 4. Admin Protection Middleware
  const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // In real scenario, verify session/token role
    const isAdminUser = req.headers['x-admin-secret'] === process.env.ADMIN_SECRET;
    if (!isAdminUser) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
  };

  // Validation & Routes
  app.post('/api/user/update', [
    body('name').isString().trim().escape(),
    body('collegeId').isString().trim().escape().optional(),
    body('departmentId').isString().trim().escape().optional(),
  ], (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    res.json({ success: true });
  });

  // Admin routes example
  app.get('/api/admin/users', isAdmin, (req, res) => {
    res.json({ users: [] }); // Protected data
  });

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);

  const port = process.env.PORT || 3000;
  const server = app.listen(Number(port), '0.0.0.0', () => console.log(`Server running on port ${port}`));
  server.on('error', (e) => console.error('Server error:', e));
}

startServer();
