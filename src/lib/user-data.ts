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
  appleHealthData?: any;
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

export const hasUploadedPDFs = (): boolean => {
  const data = getUserData();
  return data?.uploadedPDFs && data.uploadedPDFs.length > 0;
};

export const getUploadedPDFsCount = (): number => {
  const data = getUserData();
  return data?.uploadedPDFs ? data.uploadedPDFs.length : 0;
};

export const addUploadedPDF = (pdfData: {
  id: string;
  filename: string;
  platform: string;
  uploadDate: Date;
  content: string;
  insights?: any;
}) => {
  const data = getUserData();
  if (data) {
    if (!data.uploadedPDFs) {
      data.uploadedPDFs = [];
    }
    data.uploadedPDFs.push(pdfData);
    setUserData(data);
  }
};

export const updatePDFInsights = (pdfId: string, insights: any) => {
  const data = getUserData();
  if (data?.uploadedPDFs) {
    const pdfIndex = data.uploadedPDFs.findIndex(pdf => pdf.id === pdfId);
    if (pdfIndex !== -1) {
      data.uploadedPDFs[pdfIndex].insights = insights;
      setUserData(data);
    }
  }
};

export const clearUserData = () => {
  userData = null;
  localStorage.removeItem('r42-user-data');
}; 