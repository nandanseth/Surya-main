const mapFunction = (item) => ({ value: item, label: item });

const sizeClasses = ["Light Trucks ", "Medium Trucks", "Heavy Trucks", "Extra Heavy Trucks", 
"Heavy Truck Tractors", "Extra Heavy Truck-tractors", "Semitrailers", "Trailers", "Service or Utility "];

export const sizeClassOptions = sizeClasses.map(mapFunction);

const bussinessUseClasses = ["Service", "Retail", "Commerical"];

export const bussinessUseClassesOptions = bussinessUseClasses.map(mapFunction);

const classCodes = ["Non-fleet", "Fleet"];

export const classCodesOptions = classCodes.map(mapFunction);

const radius = ["Local", "Intermediate"];

export const radiusOptions = radius.map(mapFunction);
