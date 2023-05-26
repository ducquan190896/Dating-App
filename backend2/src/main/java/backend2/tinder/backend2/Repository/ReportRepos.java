package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Report;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface ReportRepos extends JpaRepository<Report, Long> {
    Optional<Report> findByReportedUserAndReportingUser(Users reportedUser, Users reportingUser);
    List<Report> findByReportedUser(Users reportedUser);
}
