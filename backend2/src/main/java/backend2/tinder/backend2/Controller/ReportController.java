package backend2.tinder.backend2.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Mapper.ReportMapper;
import backend2.tinder.backend2.Models.Block;
import backend2.tinder.backend2.Models.Report;
import backend2.tinder.backend2.Models.Response.ReportResponse;
import backend2.tinder.backend2.Service.BlockService;
import backend2.tinder.backend2.Service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    ReportService reportService;
    @Autowired
    ReportMapper reportMapper;

    @GetMapping("/report/{id}")
    public ResponseEntity<ReportResponse> getByReportId(@PathVariable Long id) {
        ReportResponse res = reportMapper.mapReportToResponse(reportService.getById(id));
        return new ResponseEntity<ReportResponse>(res, HttpStatus.OK);
    }
    @GetMapping("/{reportedId}")
    public ResponseEntity<ReportResponse> getByReportedIdAndAuth(@PathVariable long reportedId) {
        ReportResponse res = reportMapper.mapReportToResponse(reportService.getByReportedUserAndAuthUser(reportedId));
        return new ResponseEntity<ReportResponse>(res, HttpStatus.OK);
    }
    @GetMapping("/isExist/{reportedId}")
    public ResponseEntity<Boolean> isReportExist(@PathVariable long reportedId) {
        
        return new ResponseEntity<Boolean>(reportService.isReportExist(reportedId), HttpStatus.OK);
    }

    @PostMapping("/{reportedId}")
    public ResponseEntity<Object> save(@PathVariable long reportedId) {
        Report report = reportService.save(reportedId);
        if(report == null) {
            return new ResponseEntity<Object>("you cannot report one person twice", HttpStatus.BAD_REQUEST);
        }
        ReportResponse res = reportMapper.mapReportToResponse(report);
        return new ResponseEntity<Object>(res, HttpStatus.CREATED);
    }

}
