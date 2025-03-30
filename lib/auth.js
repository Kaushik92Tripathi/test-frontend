// // lib/auth.js
// import { verify } from 'jsonwebtoken';
// import { cookies } from 'next/headers';
// import { prisma } from '@/lib/db';

// export async function verifyAuth(request) {
//   try {
//     // Get the JWT token from cookies or Authorization header
//     const cookieStore = cookies();
//     let token = cookieStore.get('token')?.value;
    
//     // If token not in cookies, check Authorization header
//     if (!token) {
//       const authHeader = request.headers.get('Authorization');
//       if (authHeader && authHeader.startsWith('Bearer ')) {
//         token = authHeader.substring(7);
//       }
//     }

    
//     // If no token found anywhere, return null (unauthorized)
//     if (!token) {
//       return null;
//     }
    
//     // Verify the token
//     const decoded = verify(token, process.env.JWT_SECRET);
    
//     // Get the user from database to ensure they exist and get current role
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id }, // Using id from token instead of userId
//       select: { id: true, name: true, email: true, role: true }
//     });

//     console.log(user);
    
//     // If user doesn't exist, return null
//     if (!user) {
//       return null;
//     }
    
//     // Return the user information including their role
//     return {
//       userId: user.id, // For backward compatibility
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     };
//   } catch (error) {
//     console.error('Auth verification error:', error);
//     return null;
//   }
// }