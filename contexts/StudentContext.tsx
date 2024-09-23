// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface StudentContextProps {
//   studentId: number | null;
//   setStudentId: React.Dispatch<React.SetStateAction<number | null>>;
// }

// const StudentContext = createContext<StudentContextProps | undefined>(undefined);

// export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [studentId, setStudentId] = useState<number | null>(null);

//   return (
//     <StudentContext.Provider value={{ studentId, setStudentId }}>
//       {children}
//     </StudentContext.Provider>
//   );
// };

// export const useStudent = (): StudentContextProps => {
//   const context = useContext(StudentContext);
//   if (context === undefined) {
//     throw new Error('useStudent must be used within a StudentProvider');
//   }
//   return context;
// };
