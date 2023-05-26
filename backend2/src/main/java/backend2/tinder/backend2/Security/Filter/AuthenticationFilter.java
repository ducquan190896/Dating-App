package backend2.tinder.backend2.Security.Filter;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import backend2.tinder.backend2.Mapper.UserMapper;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Enums.GenderType;
import backend2.tinder.backend2.Models.Enums.Role;
import backend2.tinder.backend2.Models.Response.UserResponse;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Security.CustomAuthenticationManager;
import backend2.tinder.backend2.Security.SecurityConstant;
import backend2.tinder.backend2.Utils.LocalDateTypeAdapter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    @Autowired
    CustomAuthenticationManager authenticationManager;
    @Autowired 
    UserRepos userRepos;
    @Autowired
    UserMapper userMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            Users user = new ObjectMapper().readValue(request.getInputStream(), Users.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            return authenticationManager.authenticate(authentication);
        } catch (IOException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
    
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("the password is wrong");
        response.getWriter().flush();
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        List<String> claims = authResult.getAuthorities().stream().map(auth -> auth.getAuthority()).collect(Collectors.toList());
        String token = JWT.create()
        .withSubject(authResult.getName())
        .withClaim("authorities", claims)
        .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstant.expire_time))
        .sign(Algorithm.HMAC512(SecurityConstant.private_key));
        response.setHeader("Authorization", SecurityConstant.authorization + token);
        response.setStatus(HttpServletResponse.SC_OK); 
        System.out.println(authResult.getName());
        Optional<Users> entity = userRepos.findByUsername(authResult.getName());
        if(entity.isPresent()) {
            Users user = entity.get();
            System.out.println(user);
            Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDate.class, new LocalDateTypeAdapter())
            .create();
            // Gson gson = new Gson();
            // System.out.println(gson.toJson(user));
            // response.getWriter().print(gson.toJson(user));
            // System.out.println(userMapper.mapUserToResponse(user));
            // response.getWriter().write(gson.toJson(userMapper.mapUserToResponse(user)));
            UserResponse res = userMapper.mapUserToResponse(user);
            System.out.println(res);
            // Preference preference1 = new Preference(100L, GenderType.FEMALE, 30, 20);
           

            Users quan = new Users("quan", new BCryptPasswordEncoder().encode("123456"), "quan", "doan", GenderType.MALE, "hello i looking for a female partner", LocalDate.of(1996, Month.AUGUST, 10));
			quan.getRoles().add(Role.USER);
            response.getWriter().write(gson.toJson(res));
            response.getWriter().flush();
        }
     
    }
}
