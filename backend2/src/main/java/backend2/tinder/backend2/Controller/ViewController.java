package backend2.tinder.backend2.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Models.Response.View;
import backend2.tinder.backend2.Service.ViewService;

@RestController
@RequestMapping("/api/views")
public class ViewController {
    @Autowired
    ViewService viewService;

    @GetMapping("/authUser")
    public ResponseEntity<List<View>> getViewsByAuthUser() {
        return new ResponseEntity<List<View>>(viewService.suggestionsForAuthUser(), HttpStatus.OK);
    }
}
