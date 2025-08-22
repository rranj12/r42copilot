// Simple user data store
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  sex: string;
  height: string | number; // Can be inches (number) or feet'inches format (string)
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
  
  // Clear storage if it's getting full
  clearStorageIfNeeded();
  
  try {
    // Compress and limit data size for localStorage
    const compressedData = compressUserData(data);
    localStorage.setItem('r42-user-data', compressedData);
    console.log('User data saved successfully to localStorage');
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    
    // If localStorage fails, try to save essential data only
    try {
      const essentialData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        sex: data.sex,
        height: data.height,
        weight: data.weight,
        healthGoals: data.healthGoals,
        currentSupplements: data.currentSupplements,
        diagnosticData: data.diagnosticData,
        appleHealthConnected: data.appleHealthConnected,
        researchConsent: data.researchConsent,
        // Store only metadata for large files
        appleHealthData: data.appleHealthData ? {
          filename: data.appleHealthData.filename,
          recordCount: data.appleHealthData.recordCount,
          healthMetrics: data.appleHealthData.healthMetrics,
          // Don't store raw XML in localStorage
          hasRawData: !!data.appleHealthData.rawXml
        } : undefined,
        neuroAgeData: data.neuroAgeData,
        iolloData: data.iolloData,
        jonaHealthData: data.jonaHealthData,
        uploadedPDFs: data.uploadedPDFs ? data.uploadedPDFs.map(pdf => ({
          id: pdf.id,
          filename: pdf.filename,
          platform: pdf.platform,
          uploadDate: pdf.uploadDate,
          // Don't store full PDF content in localStorage
          hasContent: !!pdf.content,
          insights: pdf.insights
        })) : undefined
      };
      
      localStorage.setItem('r42-user-data', JSON.stringify(essentialData));
      console.log('Essential user data saved to localStorage (large files excluded)');
    } catch (fallbackError) {
      console.error('Failed to save even essential data:', fallbackError);
      
      // Try one more time with minimal data
      try {
        const minimalData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          uploadedPDFs: data.uploadedPDFs ? data.uploadedPDFs.map(pdf => ({
            id: pdf.id,
            filename: pdf.filename,
            platform: pdf.platform,
            uploadDate: pdf.uploadDate,
            insights: pdf.insights
          })) : undefined
        };
        
        localStorage.setItem('r42-user-data', JSON.stringify(minimalData));
        console.log('Minimal user data saved to localStorage');
      } catch (minimalError) {
        console.error('Failed to save even minimal data:', minimalError);
        console.log('User data kept in memory only - localStorage completely full');
      }
    }
  }
};

// Compress user data to fit in localStorage
const compressUserData = (data: UserData): string => {
  // Create a compressed version without large raw data
  const compressedData = {
    ...data,
    appleHealthData: data.appleHealthData ? {
      filename: data.appleHealthData.filename,
      recordCount: data.appleHealthData.recordCount,
      healthMetrics: data.appleHealthData.healthMetrics,
      // Store only first 500 chars of raw XML for analysis
      rawXml: data.appleHealthData.rawXml ? data.appleHealthData.rawXml.substring(0, 500) : undefined
    } : undefined,
    uploadedPDFs: data.uploadedPDFs ? data.uploadedPDFs.map(pdf => ({
      ...pdf,
      // Store only first 1000 chars of PDF content
      content: pdf.content ? pdf.content.substring(0, 1000) : undefined
    })) : undefined
  };
  
  const jsonString = JSON.stringify(compressedData);
  console.log(`Compressed data size: ${jsonString.length} characters`);
  
  // Check if it's still too large - reduce to 1MB limit
  if (jsonString.length > 1000000) { // 1MB limit
    // Further compress by removing more data
    const ultraCompressedData = {
      ...compressedData,
      appleHealthData: compressedData.appleHealthData ? {
        filename: compressedData.appleHealthData.filename,
        recordCount: compressedData.appleHealthData.recordCount,
        healthMetrics: compressedData.appleHealthData.healthMetrics,
        // Remove raw XML entirely
        rawXml: undefined
      } : undefined,
      uploadedPDFs: compressedData.uploadedPDFs ? compressedData.uploadedPDFs.map(pdf => ({
        ...pdf,
        // Store only first 500 chars of PDF content
        content: pdf.content ? pdf.content.substring(0, 500) : undefined
      })) : undefined
    };
    
    const ultraJsonString = JSON.stringify(ultraCompressedData);
    console.log(`Ultra-compressed data size: ${ultraJsonString.length} characters`);
    
    if (ultraJsonString.length > 1000000) {
      throw new Error('Data too large even after ultra-compression');
    }
    
    return ultraJsonString;
  }
  
  return jsonString;
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

export const getUploadedPDFs = () => {
  const data = getUserData();
  return data?.uploadedPDFs || [];
};

export const getPDFsByPlatform = (platform: string) => {
  try {
    const data = getUserData();
    return data?.uploadedPDFs?.filter(pdf => pdf.platform === platform) || [];
  } catch (error) {
    console.error(`Error getting PDFs for platform ${platform}:`, error);
    return [];
  }
};

// Clear localStorage if it's getting too full
export const clearLocalStorageIfNeeded = () => {
  try {
    const currentData = localStorage.getItem('r42-user-data');
    if (currentData && currentData.length > 800000) { // 800KB threshold
      console.warn('localStorage getting full, clearing old data...');
      localStorage.removeItem('r42-user-data');
      console.log('localStorage cleared to prevent quota errors');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking localStorage size:', error);
    return false;
  }
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

// Helper functions for height conversion
export const formatHeight = (heightInches: number | string): string => {
  if (typeof heightInches === 'string') {
    // If it's already a formatted string, return as is
    if (heightInches.includes("'") || heightInches.includes('ft')) {
      return heightInches;
    }
    // Try to parse as number
    heightInches = parseInt(heightInches) || 0;
  }
  
  if (typeof heightInches === 'number' && heightInches > 0) {
    const feet = Math.floor(heightInches / 12);
    const inches = heightInches % 12;
    return `${feet}'${inches}"`;
  }
  
  return '';
};

export const parseHeight = (heightString: string | number): number => {
  try {
    // Handle empty or undefined values
    if (!heightString || heightString === '') {
      return 0;
    }
    
    // If it's already a number, return it
    if (typeof heightString === 'number') {
      return heightString;
    }
    
    // Handle feet'inches format (e.g., "5'11"")
    const match = heightString.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      if (!isNaN(feet) && !isNaN(inches)) {
        return feet * 12 + inches;
      }
    }
    
    // Handle just inches
    const inches = parseInt(heightString);
    return isNaN(inches) ? 0 : inches;
  } catch (error) {
    console.error('Error parsing height:', error, heightString);
    return 0;
  }
};

export const clearStorageIfNeeded = () => {
  try {
    // Check localStorage usage
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        totalSize += localStorage.getItem(key)?.length || 0;
      }
    }
    
    console.log(`Current localStorage usage: ${totalSize} characters`);
    
    // If usage is high, clear old data
    if (totalSize > 4000000) { // 4MB threshold
      console.log('localStorage usage high, clearing old data...');
      
      // Keep only essential keys
      const essentialKeys = ['r42-user-data'];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !essentialKeys.includes(key)) {
          localStorage.removeItem(key);
        }
      }
      
      console.log('Old data cleared from localStorage');
    }
  } catch (error) {
    console.error('Error checking localStorage usage:', error);
  }
}; 