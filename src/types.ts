export interface College {
  id: string;
  name: string;
  city: string;
  state?: string;
  status?: 'verified' | 'pending_verification';
}

export interface Department {
  id: string;
  collegeId: string;
  name: string; // e.g., BCA, B.Tech CSE
}

export interface PyqDocument {
  id: string;
  title: string;
  subject: string;
  type: 'pyq' | 'notes' | 'syllabus';
  year?: number;
  authorName: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  collegeId?: string;
  departmentId?: string;
  downloadUrl?: string;
}

export interface RoomListing {
  id: string;
  title: string;
  type: 'single' | 'sharing' | 'pg' | 'hostel';
  rent: number;
  city: string;
  distanceFromCampus: number; // in km
  amenities: string[];
  genderPreference: 'any' | 'male' | 'female';
  status: 'available' | 'full' | 'booked';
  verified: boolean;
  ownerName: string;
  imageUrls: string[];
  collegeId?: string;
  redirectUrl?: string;
}

export interface RoommateProfile {
  id: string;
  name: string;
  collegeId: string;
  departmentId: string;
  department: string;
  budget: number;
  lifestyle: {
    sleep: 'early' | 'night_owl';
    smoking: 'smoker' | 'non_smoker';
    food: 'veg' | 'non_veg' | 'any';
    cleanliness: 'neat' | 'relaxed';
  };
  compatibility?: number; // Calculated on the fly
  avatarUrl?: string;
  bio: string;
}

export interface SeniorProfile {
  id: string;
  name: string;
  collegeId: string;
  departmentId: string;
  department: string;
  graduationYear: number;
  company: string;
  role: string;
  verified: boolean;
  mentorshipAvailable: boolean;
  avatarUrl?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'full_time';
  stipend: string;
  tags: string[];
  postedAt: string;
  collegeId?: string;
  departmentId?: string;
}
