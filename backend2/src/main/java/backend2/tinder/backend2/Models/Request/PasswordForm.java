package backend2.tinder.backend2.Models.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordForm {
    private String password;
    private String newPassword;
    private String confirmPassword;
}
