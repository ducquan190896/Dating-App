package backend2.tinder.backend2.Models.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignIn {
    private String username;
    private String password;
    private String publicKey;
    
    public UserSignIn(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
