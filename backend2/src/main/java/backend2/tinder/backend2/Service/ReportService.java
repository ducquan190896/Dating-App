package backend2.tinder.backend2.Service;

import backend2.tinder.backend2.Models.Report;
import backend2.tinder.backend2.Models.Response.ReportResponse;

public interface ReportService {
    Report getById(long id);
    Report getByReportedUserAndAuthUser(long reportedUserId);
    Report save(long reportedUserId);
    boolean isReportExist(long reportedUserId);
}
