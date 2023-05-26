package backend2.tinder.backend2.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Models.Response.View;


public interface ViewService {
    List<View> suggestionsForAuthUser();
}
