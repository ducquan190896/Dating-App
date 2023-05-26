package backend2.tinder.backend2;

import java.time.LocalDate;
import java.time.Month;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import backend2.tinder.backend2.Mapper.ReportMapper;
import backend2.tinder.backend2.Models.Block;
import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Report;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Enums.GenderType;
import backend2.tinder.backend2.Models.Enums.Role;
import backend2.tinder.backend2.Models.Response.ReportResponse;
import backend2.tinder.backend2.Repository.BlockRepos;
import backend2.tinder.backend2.Repository.InterestRepos;
import backend2.tinder.backend2.Repository.PreferenceRepos;
import backend2.tinder.backend2.Repository.ReportRepos;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.InterestService;
import backend2.tinder.backend2.Utils.DistanceCoding;

@SpringBootApplication
public class Backend2Application {

	public static void main(String[] args) {
		SpringApplication.run(Backend2Application.class, args);
	}
	
	@Bean
	CommandLineRunner commandLineRunner(UserRepos userRepos, InterestRepos interestRepos, PreferenceRepos preferenceRepos, ReportRepos reportRepos, BlockRepos blockRepos, ReportMapper reportMapper, DistanceCoding distanceCoding, InterestService interestService) {
		return args -> {
			
			Users quan = new Users("quan", new BCryptPasswordEncoder().encode("123456"), "quan", "doan", GenderType.MALE, "hello i looking for a female partner", LocalDate.of(1998, Month.AUGUST, 10), 64.9942532, 25.4618881);
			quan.getRoles().add(Role.USER);
			Users khanh = new Users("khanh", new BCryptPasswordEncoder().encode("123456"), "khanh", "nguyen", GenderType.FEMALE, "hello i looking for a male partner", LocalDate.of(1996, Month.APRIL, 2), 65.0540746, 25.4554205);
			khanh.getRoles().add(Role.USER);
			Users duy = new Users("duy", new BCryptPasswordEncoder().encode("123456"), "duy", "doan", GenderType.MALE, "hello i looking for a female partner", LocalDate.of(2003, Month.APRIL, 2), 65.0104222, 25.4905775);
			duy.getRoles().add(Role.USER);
			Users bo = new Users("bo", new BCryptPasswordEncoder().encode("123456"), "bo", "doan", GenderType.MALE, "hello i looking for a female partner", LocalDate.of(1985, Month.APRIL, 2), 64.9167, 25.5);
			bo.getRoles().add(Role.USER);
			Users my = new Users("my", new BCryptPasswordEncoder().encode("123456"), "my", "nguyen", GenderType.FEMALE, "hello i looking for a female partner", LocalDate.of(1997, Month.APRIL, 2), 60.2646166, 25.0862993);
			my.getRoles().add(Role.USER);
			userRepos.save(quan);
			userRepos.save(khanh);
			userRepos.save(duy);
			userRepos.save(bo);
			userRepos.save(my);

			Preference preference1 = new Preference(100L, GenderType.FEMALE, 30, 20);
			preference1.setUser(quan);
			Preference preference2 = new Preference(100L, GenderType.MALE, 30, 20);
			preference2.setUser(khanh);
			preferenceRepos.save(preference1);
			preferenceRepos.save(preference2);

			Preference preference3 = new Preference(1000L, GenderType.FEMALE, 30, 20);
			preference3.setUser(duy);
			Preference preference4 = new Preference(50L, GenderType.FEMALE, 40, 20);
			preference4.setUser(bo);
			preferenceRepos.save(preference3);
			preferenceRepos.save(preference4);

			Preference preference5 = new Preference(120L, GenderType.MALE, 35, 18);
			preference5.setUser(my);
			preferenceRepos.save(preference5);

			khanh.setPreference(preference2);
			quan.setPreference(preference1);
			bo.setPreference(preference4);
			duy.setPreference(preference3);
			my.setPreference(preference5);

			userRepos.save(quan);
			userRepos.save(khanh);
			userRepos.save(duy);
			userRepos.save(bo);
			userRepos.save(my);

			// List<String> interestsString = Arrays.asList("swimming", "boxing", "finnish language");
			List<String> interestsString = Arrays.asList("jogging", "panting", "german language", "shopping");
			List<Interest> interests1 = interestsString.stream().map(hobby -> {
				Interest interest = new Interest(hobby);
				Optional<Interest> entity = interestRepos.findByName(interest.getName());
				if(entity.isPresent()) {
					interest = entity.get();
					interest.getUsers().add(quan);
					interest = interestRepos.save(interest);
					quan.getInterest().add(interest);
					return interest;
				} 
				interest.getUsers().add(quan);
				interest = interestRepos.save(interest);
				quan.getInterest().add(interest);
				return	interest;
			}).collect(Collectors.toList());
			userRepos.save(quan);

			List<String> interestsString2 = Arrays.asList("jogging", "panting", "german language", "shopping");
			List<Interest> interests2 = interestsString2.stream().map(hobby -> {
				
				Optional<Interest> entity = interestRepos.findByName(hobby);
				if(entity.isPresent()) {
					Interest interest = entity.get();
					interest.getUsers().add(khanh);
					interest = interestRepos.save(interest);
					khanh.getInterest().add(interest);
					return interest;
				} 
				Interest interest = new Interest(hobby);
				interest.getUsers().add(khanh);
				interest = interestRepos.save(interest);
				khanh.getInterest().add(interest);
				return	interest;
			}).collect(Collectors.toList());
			userRepos.save(khanh);

			List<String> interestsString3 = Arrays.asList("football", "badminton", "german language");
			// List<String> interestsString3 = Arrays.asList("jogging", "panting", "german language", "shopping");
			List<Interest> interests3 = interestsString3.stream().map(hobby -> {
				Interest interest = new Interest(hobby);
				Optional<Interest> entity = interestRepos.findByName(interest.getName());
				if(entity.isPresent()) {
					interest = entity.get();
					interest.getUsers().add(duy);
					interest = interestRepos.save(interest);
					duy.getInterest().add(interest);
					return interest;
				} 
				interest.getUsers().add(duy);
				interest = interestRepos.save(interest);
				duy.getInterest().add(interest);
				return	interest;
			}).collect(Collectors.toList());
			userRepos.save(duy);

			List<String> interestsString4 = Arrays.asList("basketball", "gun");
			List<Interest> interests4 = interestsString4.stream().map(hobby -> {
				Interest interest = new Interest(hobby);
				Optional<Interest> entity = interestRepos.findByName(interest.getName());
				if(entity.isPresent()) {
					interest = entity.get();
					interest.getUsers().add(bo);
					interest = interestRepos.save(interest);
					bo.getInterest().add(interest);
					return interest;
				} 
				interest.getUsers().add(bo);
				interest = interestRepos.save(interest);
				bo.getInterest().add(interest);
				return	interest;
			}).collect(Collectors.toList());
			userRepos.save(bo);

			List<String> interestsString5 = Arrays.asList("chatting", "shopping", "badminton");
			List<Interest> interests5 = interestsString5.stream().map(hobby -> {
				Interest interest = new Interest(hobby);
				Optional<Interest> entity = interestRepos.findByName(interest.getName());
				if(entity.isPresent()) {
					interest = entity.get();
					interest.getUsers().add(my);
					interest = interestRepos.save(interest);
					my.getInterest().add(interest);
					return interest;
				} 
				interest.getUsers().add(my);
				interest = interestRepos.save(interest);
				my.getInterest().add(interest);
				return	interest;
			}).collect(Collectors.toList());
			userRepos.save(my);

			// Report report1 = new Report(quan, khanh);
			// reportRepos.save(report1);
			// ReportResponse res = reportMapper.mapReportToResponse(report1);
			// System.out.println(res);

			// Block block = new Block(quan, khanh);
			// blockRepos.save(block);


			// double lat1 = 53.32055555555556;
			// double lat2 = 53.31861111111111;
			// double lon1 = -1.7297222222222221;
			// double lon2 = -1.6997222222222223;
			// double distance = distanceCoding.distanceCalculator(lat1, lat2, lon1, lon2);
			// System.out.println("distance is : " +  Math.round(distance) + " km");

			//// from oulu to helsinki, the distance is approximately 530 km based on the bird's flying route
			// double lat1 = 65.056950;
			// double lat2 = 60.264278;
			// double lon1 = 25.474090;
			// double lon2 = 25.084789;
			// double distance = distanceCoding.distanceCalculator(lat1, lat2, lon1, lon2);
			// System.out.println("distance is : " +  Math.round(distance) + " km");
		};
	}

	
}
