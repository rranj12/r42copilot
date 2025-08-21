// Simple user data store
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  sex: string;
  height: string;
  weight: string;
  healthGoals: string;
  currentSupplements: string;
  diagnosticData: {
    jonaHealth: boolean;
    neuroAge: boolean;
    iollo: boolean;
  };
  appleHealthConnected: boolean;
  researchConsent: boolean;
  neuroAgeData?: any;
  iolloData?: any;
  jonaHealthData?: any;
  uploadedPDFs?: {
    id: string;
    filename: string;
    platform: string;
    uploadDate: Date;
    content: string;
    insights?: any;
  }[];
}

let userData: UserData | null = null;

export const setUserData = (data: UserData) => {
  userData = data;
  // Also store in localStorage for persistence
  localStorage.setItem('r42-user-data', JSON.stringify(data));
};

export const getUserData = (): UserData | null => {
  if (!userData) {
    // Try to load from localStorage
    const stored = localStorage.getItem('r42-user-data');
    if (stored) {
      userData = JSON.parse(stored);
    }
  }
  return userData;
};

export const getUserName = (): string => {
  const data = getUserData();
  if (data?.firstName && data?.lastName) {
    return `${data.firstName} ${data.lastName}`;
  } else if (data?.firstName) {
    return data.firstName;
  }
  return 'User';
}; 