package com.EduTrack.EDUTRACK_Portfolio_MS.exception;

public class EmailSendException extends RuntimeException {
    public EmailSendException(String message, Throwable cause) {
        super(message, cause);
    }
}