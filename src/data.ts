import { College, Department, PyqDocument, RoomListing, RoommateProfile, SeniorProfile, Internship } from './types';

export const MOCK_COLLEGES: College[] = [
  { id: 'c1', name: 'National Institute of Technology', city: 'Delhi', state: 'Delhi', status: 'verified' },
  { id: 'c2', name: 'Delhi University', city: 'Delhi', state: 'Delhi', status: 'verified' },
  { id: 'c3', name: 'Birla Institute of Technology', city: 'Pilani', state: 'Rajasthan', status: 'verified' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'cs1', collegeId: 'c1', name: 'B.Tech Computer Science' },
  { id: 'bca1', collegeId: 'c1', name: 'BCA' },
  { id: 'bcom1', collegeId: 'c2', name: 'B.Com (Hons)' },
  { id: 'cs2', collegeId: 'c3', name: 'B.Tech Computer Science' },
];

export const MOCK_PYQS: PyqDocument[] = [
  {
    id: 'd1',
    title: 'Operating Systems - 2023 Final Paper',
    subject: 'Operating Systems',
    type: 'pyq',
    year: 2023,
    authorName: 'Rahul K.',
    downloadCount: 1240,
    rating: 4.8,
    tags: ['OS', 'Finals', '2023'],
    collegeId: 'c1',
    departmentId: 'cs1'
  },
  {
    id: 'd2',
    title: 'Data Structures Handwritten Notes',
    subject: 'Data Structures',
    type: 'notes',
    authorName: 'Priya S.',
    downloadCount: 3400,
    rating: 4.9,
    tags: ['DSA', 'Notes', 'Mid-terms'],
    collegeId: 'c1',
    departmentId: 'cs1'
  },
  {
    id: 'd3',
    title: 'Database Management Systems Syllabus',
    subject: 'DBMS',
    type: 'syllabus',
    year: 2024,
    authorName: 'Admin',
    downloadCount: 560,
    rating: 5.0,
    tags: ['DBMS', 'Syllabus'],
    collegeId: 'c2',
    departmentId: 'bcom1'
  }
];

export const MOCK_ROOMS: RoomListing[] = [
  {
    id: 'r1',
    title: 'Spacious Single Room near North Campus',
    type: 'single',
    rent: 8500,
    city: 'Delhi',
    distanceFromCampus: 1.2,
    amenities: ['WiFi', 'AC', 'Attached Bath'],
    genderPreference: 'any',
    status: 'available',
    verified: true,
    ownerName: 'Amit Verma',
    imageUrls: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'r2',
    title: 'Twin Sharing PG with Food',
    type: 'pg',
    rent: 12000,
    city: 'Delhi',
    distanceFromCampus: 0.5,
    amenities: ['WiFi', 'Food', 'Laundry', 'AC'],
    genderPreference: 'male',
    status: 'available',
    verified: true,
    ownerName: 'Sharma PG Hub',
    imageUrls: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'r3',
    title: 'Quiet Hostel Room',
    type: 'hostel',
    rent: 6000,
    city: 'Pilani',
    distanceFromCampus: 2.0,
    amenities: ['WiFi', 'Library', 'Mess'],
    genderPreference: 'female',
    status: 'booked',
    verified: false,
    ownerName: 'Campus Living',
    imageUrls: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800']
  }
];

export const MOCK_ROOMMATES: RoommateProfile[] = [
  {
    id: 'rm1',
    name: 'Karan Singh',
    collegeId: 'c1',
    departmentId: 'cs1',
    department: 'B.Tech Computer Science',
    budget: 10000,
    lifestyle: { sleep: 'night_owl', smoking: 'non_smoker', food: 'any', cleanliness: 'neat' },
    compatibility: 92,
    bio: 'Coding till 3 AM. Looking for a chill flatmate who keeps common areas clean.'
  },
  {
    id: 'rm2',
    name: 'Sneha Patel',
    collegeId: 'c2',
    departmentId: 'bcom1',
    department: 'B.Com (Hons)',
    budget: 15000,
    lifestyle: { sleep: 'early', smoking: 'non_smoker', food: 'veg', cleanliness: 'neat' },
    compatibility: 85,
    bio: 'Early riser, focused on studies. Need a quiet place.'
  },
  {
    id: 'rm3',
    name: 'Rohan Desai',
    collegeId: 'c1',
    departmentId: 'bca1',
    department: 'BCA',
    budget: 8000,
    lifestyle: { sleep: 'night_owl', smoking: 'smoker', food: 'non_veg', cleanliness: 'relaxed' },
    compatibility: 45,
    bio: 'Easy going, love music and gaming.'
  }
];

export const MOCK_SENIORS: SeniorProfile[] = [
  {
    id: 's1',
    name: 'Anjali Sharma',
    collegeId: 'c1',
    departmentId: 'cs1',
    department: 'B.Tech CSE',
    graduationYear: 2022,
    company: 'Google',
    role: 'Software Engineer',
    verified: true,
    mentorshipAvailable: true
  },
  {
    id: 's2',
    name: 'Vikram Gupta',
    collegeId: 'c2',
    departmentId: 'bca1',
    department: 'BCA',
    graduationYear: 2021,
    company: 'Deloitte',
    role: 'Analyst',
    verified: true,
    mentorshipAvailable: false
  },
  {
    id: 's3',
    name: 'Megha Reddy',
    collegeId: 'c3',
    departmentId: 'cs2',
    department: 'B.Tech ECE',
    graduationYear: 2023,
    company: 'Microsoft',
    role: 'Product Manager',
    verified: true,
    mentorshipAvailable: true
  }
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'i1',
    title: 'Frontend Developer Intern',
    company: 'Zomato',
    location: 'Gurgaon (Hybrid)',
    type: 'internship',
    stipend: '₹30,000/mo',
    tags: ['React', 'TypeScript', 'Web'],
    postedAt: '2 days ago',
    collegeId: 'c1'
  },
  {
    id: 'i2',
    title: 'Product Design Intern',
    company: 'Cred',
    location: 'Bangalore (On-site)',
    type: 'internship',
    stipend: '₹40,000/mo',
    tags: ['Figma', 'UI/UX'],
    postedAt: '5 days ago'
  },
  {
    id: 'i3',
    title: 'SDE-1',
    company: 'Amazon',
    location: 'Remote',
    type: 'full_time',
    stipend: 'Competitive',
    tags: ['Java', 'AWS', 'Backend'],
    postedAt: '1 week ago'
  }
];
