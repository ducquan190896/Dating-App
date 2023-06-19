package backend2.tinder.backend2.Config;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Security.SecurityConstant;
import backend2.tinder.backend2.Service.MessageService;
import backend2.tinder.backend2.Service.UserService;

@Service
public class SocketService {
    @Autowired
    UserService userService;
    @Autowired
    MessageService messageService;
 

    public UsernamePasswordAuthenticationToken authenticateMessageToken(String username, String token) {
        UsernamePasswordAuthenticationToken authenticationToken = messageService.authenticateMessageFromSocket(username, token);

        return authenticationToken;
    }
}
