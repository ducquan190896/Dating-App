package backend2.tinder.backend2.Service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Exception.BadResultException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Mapper.ReportMapper;
import backend2.tinder.backend2.Mapper.UserMapper;
import backend2.tinder.backend2.Models.Report;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Repository.ReportRepos;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.ReportService;
import backend2.tinder.backend2.Service.UserService;

@Service
public class ReportServiceImp  implements ReportService{
    @Autowired
    UserService userService;
    @Autowired
    ReportRepos reportRepos;
    @Autowired
    UserMapper userMapper;
    @Autowired
    ReportMapper reportMapper;
    @Autowired
    UserRepos userRepos;

    @Override
    public Report getById(long id) {
       Optional<Report> entity = reportRepos.findById(id);
       if(!entity.isPresent()) {
        throw new EntityNotFoundException("the report not found");
       }
       Report report = entity.get();
       return report;
    }
    @Override
    public Report getByReportedUserAndAuthUser(long reportedUserId) {
        Users reportedUser = userService.getUserById(reportedUserId);
        Users authUser = userService.getAuthUser();
        Optional<Report> entity = reportRepos.findByReportedUserAndReportingUser(reportedUser, authUser);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the report not found");
        }
        Report report = entity.get();
        return report;
    }

    @Override
    public boolean isReportExist(long reportedUserId) {
        Users reportedUser = userService.getUserById(reportedUserId);
        Users authUser = userService.getAuthUser();
        Optional<Report> entity = reportRepos.findByReportedUserAndReportingUser(reportedUser, authUser);
        if(!entity.isPresent()) {
            return false;
        }
        return true;
    }

    @Override
    public Report save(long reportedUserId) {
        Users reportedUser = userService.getUserById(reportedUserId);
        Users authUser = userService.getAuthUser();
        Optional<Report> entity = reportRepos.findByReportedUserAndReportingUser(reportedUser, authUser);
        if(reportedUser.getId() == authUser.getId()) {
            throw new BadResultException("you cannot report yourself");
        }
        if(entity.isPresent()) {
          return null;
        } 
        List<Report> reports = reportRepos.findByReportedUser(reportedUser);
        if(reports.size() >= 2 ) {
            reportedUser.setSuspended(true);
            userRepos.save(reportedUser);
        }
        Report report = new Report(reportedUser, authUser);
        return reportRepos.save(report);
    }

    

    
}
