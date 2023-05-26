package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Report;
import backend2.tinder.backend2.Models.Response.ReportResponse;
import lombok.NoArgsConstructor;

@Component
public class ReportMapper {
    @Autowired
    UserMapper userMapper;
    @Autowired
    ModelMapper modelMapper;

    // public ReportResponse mapReportToResponse(Report report) {
    //     ReportResponse res = new ReportResponse(report.getId(), userMapper.mapUserToResponse(report.getReportedUser()), userMapper.mapUserToResponse(report.getReportingUser()), report.getCreatedDate());
    //     return res;
    // }    
    public ReportResponse mapReportToResponse(Report report) {
        ReportResponse res = modelMapper.map(report, ReportResponse.class);
        return res;
    }    
}
