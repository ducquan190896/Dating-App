package backend2.tinder.backend2.Exception;

public class EntityExistingException extends RuntimeException {
    
    public EntityExistingException(String message) {
        super(message);
    }
}
