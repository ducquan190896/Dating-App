package backend2.tinder.backend2.Models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.*;


// @Table(name = "like", uniqueConstraints = @UniqueConstraint(columnNames = {"liked_user_id", "liking_user_id"}))
@Table(name = "like1")
@Entity(name = "Like1")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Like {
    @Id    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "liked_user_id", referencedColumnName = "id")
    private Users likedUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "liking_user_id", referencedColumnName = "id")
    private Users likingUser;

    @Column(name = "is_blocked")
    private boolean isBlocked;

    @Column(name = "match_id")
    private long matchId;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime createdDate;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @UpdateTimestamp
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;


    public Like(Users likedUser, Users likingUser) {
        this.likedUser = likedUser;
        this.likingUser = likingUser;
        this.isBlocked = false;
    }

    public boolean getIsBlock() {
        return this.isBlocked;
    }

    public void setIsBlock(boolean block) {
        this.isBlocked = block;
    }
    
}
