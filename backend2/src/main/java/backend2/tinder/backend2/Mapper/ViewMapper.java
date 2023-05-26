package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Response.View;

@Component
public class ViewMapper {
    @Autowired
    ModelMapper modelMapper;

    public View mapToView(Users user) {
        View view = modelMapper.map(user, View.class);
        return view;
    }
}
