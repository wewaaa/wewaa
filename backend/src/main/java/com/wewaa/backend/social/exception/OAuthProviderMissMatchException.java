package com.wewaa.backend.social.exception;

public class OAuthProviderMissMatchException extends RuntimeException {

    public OAuthProviderMissMatchException(String message) {
        super(message);
    }
}
