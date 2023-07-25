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
import backend2.tinder.backend2.Utils.SampleGenerator;

@SpringBootApplication
public class Backend2Application {

	public static void main(String[] args) {
		SpringApplication.run(Backend2Application.class, args);
	}
	
	@Bean
	CommandLineRunner commandLineRunner(UserRepos userRepos, InterestRepos interestRepos, PreferenceRepos preferenceRepos, ReportRepos reportRepos, BlockRepos blockRepos, ReportMapper reportMapper, DistanceCoding distanceCoding, InterestService interestService, SampleGenerator generator) {
		return args -> {
			

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





			// Users quan = new Users("quan", new BCryptPasswordEncoder().encode("123456"), "quan", "doan", GenderType.MALE, "hello i looking for a female partner", LocalDate.of(1998, Month.AUGUST, 10), 64.9942532, 25.4618881);
			// List<String> interestsString = Arrays.asList("swimming", "boxing", "finnish language");
			// Preference preference1 = new Preference(1000L, GenderType.FEMALE, 30, 20);

			Users quan = generator.generateUser("quan", "doan", GenderType.MALE, LocalDate.of(1998, Month.AUGUST, 10), 64.9942532, 25.4618881, "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("swimming", "boxing", "finnish language", "spanish language", "biking"));

			Users duy = generator.generateUser("duy", "doan", GenderType.MALE, LocalDate.of(2003, Month.AUGUST, 10), 64.994240, 25.461560, "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("badminton", "boxing", "finnish language"));

			Users huy = generator.generateUser("huy", "doan", GenderType.MALE, LocalDate.of(1995, Month.AUGUST, 10), 65.394240, 24.461560, "https://images.unsplash.com/photo-1562939562-15d588950600?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("spanish language", "boxing", "finnish language", "football"));

			Users alex = generator.generateUser("Alex", "kohornen", GenderType.MALE, LocalDate.of(1993, Month.AUGUST, 10), 60.994240, 24.461560, "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("badminton", "boxing", "finnish language", "swimming"));

			Users Cruise = generator.generateUser("Tome", "Cruise", GenderType.MALE, LocalDate.of(1996, Month.AUGUST, 10), 65.994240, 22.461560, "https://images.unsplash.com/photo-1620781245642-7f5bc98987b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("biking", "swimming", "spanish language", "boxing", "finnish language"));

			Users Depp = generator.generateUser("Johnny", "Depp", GenderType.MALE, LocalDate.of(1996, Month.AUGUST, 10), 63.994240, 24.161560, "https://images.unsplash.com/photo-1470974811485-fa49afec0424?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("biking", "swimming", "spanish language", "boxing", "german language"));

			Users Ronaldo = generator.generateUser("Ronaldo", "cristiano", GenderType.MALE, LocalDate.of(1996, Month.AUGUST, 10), 62.994240, 24.461560, "https://images.unsplash.com/photo-1593479268141-09b35383faaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("biking", "swimming", "spanish language", "boxing", "german language"));

			Users neymar = generator.generateUser("neymar", "junior", GenderType.MALE, LocalDate.of(1999, Month.AUGUST, 10), 64.994240, 23.461560, "https://unsplash.com/photos/VnCU89aFXGU", 1000L, GenderType.FEMALE, 40, 18, Arrays.asList("biking", "swimming", "spanish language", "boxing", "german language", "football"));


			Users khanh = generator.generateUser("khanh", "nguyen", GenderType.FEMALE, LocalDate.of(1996, Month.AUGUST, 10), 65.294240, 25.661560, "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("swimming", "boxing", "finnish language", "spanish language"));

			Users my = generator.generateUser("my", "tran", GenderType.FEMALE, LocalDate.of(1996, Month.AUGUST, 10), 65.794240, 24.461560, "https://media.licdn.com/dms/image/D4D03AQFD9E_OYnFV5A/profile-displayphoto-shrink_800_800/0/1677957975594?e=2147483647&v=beta&t=g7NXs1xWv4AAkL1QOE7nFEs2Mjfz7ZzY8Nu8GGCm_z0", 1000L, GenderType.MALE, 30, 18, Arrays.asList("swimming", "walking", "vietnamese language", "boxing"));

			Users huong = generator.generateUser("huong", "tran", GenderType.FEMALE, LocalDate.of(1999, Month.AUGUST, 10), 65.294240, 25.861560, "https://images.unsplash.com/photo-1641671135777-e5f86bb8e423?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("biking", "walking", "finnish language", "swimming"));

			Users mina = generator.generateUser("Mina", "nguyen", GenderType.FEMALE, LocalDate.of(1994, Month.AUGUST, 10), 65.994240, 25.461560, "https://images.unsplash.com/photo-1673610178158-1c4c5b7e4d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("biking", "swimming", "finnish language", "badminton"));

			Users anna = generator.generateUser("Anna", "nguyen", GenderType.FEMALE, LocalDate.of(2001, Month.AUGUST, 10), 65.994240, 25.461560, "https://images.unsplash.com/photo-1589466080662-42fb21ee9f9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=375&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("biking", "swimming", "spanish language", "boxing", "finnish language"));

			Users phuong = generator.generateUser("phuong", "nguyen", GenderType.FEMALE, LocalDate.of(2001, Month.AUGUST, 10), 65.414240, 25.461560, "https://images.unsplash.com/photo-1599447291786-724cfd131568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("biking", "swimming", "finnish language" , "badminton"));

			Users katty = generator.generateUser("katty", "nguyen", GenderType.FEMALE, LocalDate.of(1997, Month.AUGUST, 10), 63.214240, 25.121560, "https://plus.unsplash.com/premium_photo-1682965453758-9978b45a560a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("footbal", "swimming", "finnish language"));

			Users julia = generator.generateUser("Julia", "nguyen", GenderType.FEMALE, LocalDate.of(1997, Month.AUGUST, 10), 64.214240, 25.421560, "https://images.unsplash.com/photo-1613502247564-0a13e52538f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("footbal", "swimming", "finnish language", "boxing", "hiking"));

			Users jenny = generator.generateUser("Jenny", "nguyen", GenderType.FEMALE, LocalDate.of(1990, Month.AUGUST, 10), 65.914240, 24.121560, "https://images.unsplash.com/photo-1605122897309-17343bb5bfb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("footbal", "swimming", "finnish language", "walking", "hiking", "biking"));

			Users alice = generator.generateUser("Alice", "nguyen", GenderType.FEMALE, LocalDate.of(1990, Month.AUGUST, 10), 65.214240, 25.421560, "https://images.unsplash.com/photo-1609565910144-63e045db453a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=454&q=80", 1000L, GenderType.MALE, 40, 18, Arrays.asList("footbal", "swimming", "finnish language", "biking"));


		};
	}

	
}
