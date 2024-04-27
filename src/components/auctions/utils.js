// export const convert_to_milliseconds = (timeString) => {
//     const timeUnit = timeString.slice(-1).toLowerCase(); // Extract the unit (e.g., "h" for hours)
//     const timeValue = parseInt(timeString.slice(0, -1)); // Extract the numeric value (e.g., 1)
  
//     if (timeUnit !== 'h' && timeUnit !== 'm' && timeUnit !== 's') { // Validate unit
//       throw new Error('Invalid time unit. Please use h (hours), m (minutes), or s (seconds).');
//     }
  
//     const conversionFactors = { // Conversion factors for each unit
//       h: 60 * 60 * 1000, // 1 hour = 3600 seconds * 1000 milliseconds
//       m: 60 * 1000, // 1 minute = 60 seconds * 1000 milliseconds
//       s: 1000, // 1 second = 1000 milliseconds
//     };
  
//     return timeValue * conversionFactors[timeUnit]; // Calculate duration in milliseconds
//   };
  