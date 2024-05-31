package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmailAndPassword(String email, String password);
    User findByUsernameAndPassword(String username, String password);

}
