//package com.pharmacy.management.pharmacy_management_app.service;
//
//import org.springframework.stereotype.Service;
//
//import java.security.SecureRandom;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class OtpService {
//    // Store OTPs with their associated email
//    private Map<String, String> otpStorage = new HashMap<>();
//
//    public String generateOtp() {
//        // Generate a 6-digit OTP
//        SecureRandom random = new SecureRandom();
//        int otp = 100000 + random.nextInt(900000);
//        return String.valueOf(otp);
//    }
//
//    public void storeOtp(String email, String otp) {
//        // Remove any existing OTP for this email before storing new one
//        otpStorage.remove(email);
//        otpStorage.put(email, otp);
//    }
//
//    public boolean validateOtp(String email, String userProvidedOtp) {
//        // Check if OTP exists for the email
//        String storedOtp = otpStorage.get(email);
//
//        // Validate and remove the OTP after use
//        if (storedOtp != null && storedOtp.equals(userProvidedOtp)) {
//            otpStorage.remove(email);
//            return true;
//        }
//
//        return false;
//    }
//
//    public void invalidateOtp(String email) {
//        // Remove OTP for the given email
//        otpStorage.remove(email);
//    }
//}


package com.pharmacy.management.pharmacy_management_app.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    // Store OTPs with their associated email and generation timestamp
    private Map<String, OtpEntry> otpStorage = new ConcurrentHashMap<>();

    // OTP expiration time in seconds
    private static final long OTP_EXPIRATION_TIME = 120; // 2 minutes

    // Inner class to store OTP with timestamp
    private static class OtpEntry {
        private final String otp;
        private final Instant createdAt;

        public OtpEntry(String otp) {
            this.otp = otp;
            this.createdAt = Instant.now();
        }

        public String getOtp() {
            return otp;
        }

        public boolean isExpired() {
            return Instant.now().isAfter(createdAt.plusSeconds(OTP_EXPIRATION_TIME));
        }
    }

    public String generateOtp() {
        // Generate a 6-digit OTP
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void storeOtp(String email, String otp) {
        // Remove any existing OTP for this email before storing new one
        otpStorage.remove(email);
        otpStorage.put(email, new OtpEntry(otp));
    }

    public boolean validateOtp(String email, String userProvidedOtp) {
        // Check if OTP exists for the email
        OtpEntry otpEntry = otpStorage.get(email);

        // Validate OTP and check expiration
        if (otpEntry != null && !otpEntry.isExpired()) {
            boolean isValid = otpEntry.getOtp().equals(userProvidedOtp);

            // Remove OTP after validation attempt
            otpStorage.remove(email);

            return isValid;
        }

        // Remove expired or non-existent OTP
        otpStorage.remove(email);
        return false;
    }

    public void invalidateOtp(String email) {
        // Remove OTP for the given email
        otpStorage.remove(email);
    }
}