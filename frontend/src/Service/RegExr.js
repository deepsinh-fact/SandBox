const ServiceRegExr = {
  emailRegExr: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  gstRegExr: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  cinRegExr: /^[LUF][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
  cinRegExrllp: /^[A-Z]{3}-[0-9]{4}$/,
  cinRegExrf: /^[A-Z]{4}[0-9]{2}[A-Z]{4}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
  dinRegExr: /^[0-9]{8}$/,
  panRegExr: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  msmeRegExr: /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{7}$/,
  mobile360RegExr: /^[6-9][0-9]{9}$/,
  iecRegExr: /^[0-9]{10}$/,
};

export default ServiceRegExr;