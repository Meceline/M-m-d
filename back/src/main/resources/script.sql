/*CREATE TABLE USERS (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       username VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE THEMES (
                        id BIGINT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(255) NOT NULL,
                        description VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ARTICLES (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          title VARCHAR(255) NOT NULL,
                          content TEXT NOT NULL,
                          user_id BIGINT NOT NULL,
                          theme_id BIGINT NOT NULL,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES USERS(id),
                          FOREIGN KEY (theme_id) REFERENCES THEMES(id)
);

CREATE TABLE COMMENTS (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          content TEXT NOT NULL,
                          user_id BIGINT NOT NULL,
                          article_id BIGINT NOT NULL,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES USERS(id),
                          FOREIGN KEY (article_id) REFERENCES ARTICLES(id)
);

-- Inserting user
INSERT INTO USERS(username, email, password) VALUES ('test', 'test@test.com', 'testPDN1!');
-- Inserting themes
INSERT INTO THEMES(title, description) VALUES ('T1', 'T1 Description');
INSERT INTO THEMES(title, description) VALUES ('T2', 'T2 Description');
INSERT INTO THEMES(title, description) VALUES ('T3', 'T3 Description');
INSERT INTO THEMES(title, description) VALUES ('T4', 'T4 Description');
INSERT INTO THEMES(title, description) VALUES ('T5', 'T5 Description');
INSERT INTO THEMES(title, description) VALUES ('T6', 'T6 Description');
INSERT INTO THEMES(title, description) VALUES ('T7', 'T7 Description');

-- Inserting articles
INSERT INTO ARTICLES(title, content, user_id, theme_id) VALUES ('A1', 'A1 Description.', 1, (SELECT id FROM THEMES WHERE title = 'T1'));
INSERT INTO ARTICLES(title, content, user_id, theme_id) VALUES ('A1', 'A1 Description.', 1, (SELECT id FROM THEMES WHERE title = 'T1'));
INSERT INTO ARTICLES(title, content, user_id, theme_id) VALUES ('A3', 'A3 Description.', 1, (SELECT id FROM THEMES WHERE title = 'T2'));
INSERT INTO ARTICLES(title, content, user_id, theme_id) VALUES ('A4', 'A4 Description.', 1, (SELECT id FROM THEMES WHERE title = 'T3'));
INSERT INTO ARTICLES(title, content, user_id, theme_id) VALUES ('A5', 'A5 Description.', 1, (SELECT id FROM THEMES WHERE title = 'T5'));

-- Inserting comments
INSERT INTO COMMENTS(content, user_id, article_id) VALUES('C1', (SELECT id FROM USERS WHERE username = 'test'), (SELECT id FROM ARTICLES WHERE title = 'A5'));*/