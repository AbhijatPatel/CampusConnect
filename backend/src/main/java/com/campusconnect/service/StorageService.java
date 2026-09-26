package com.campusconnect.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String storeFile(MultipartFile file, String subDir);
    byte[] loadFile(String fileName);
}
