package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TermRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TermServiceImpl implements TermService {

    private final TermRepository repository;
    @Override
    public Term save(Term term) {
        return repository.save(term);
    }

    @Override
    public Term findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Term> findAll() {
        return repository.findAll();
    }

    @Override
    public Term update(Term term) {
        return repository.save(term);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
