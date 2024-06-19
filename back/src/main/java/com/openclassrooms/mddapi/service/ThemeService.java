package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    public Iterable<Theme> getAllTheme(){
        return themeRepository.findAll();
    }

    public Optional<Theme> getThemeById(Long theme_id){
        return themeRepository.findById(theme_id);
    }
}
