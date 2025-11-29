-- ============================================
-- GUESTS DATA (18 guests)
-- ============================================
INSERT INTO `guest`(`id`, `country`, `country_flag`, `email`, `full_name`, `national_id`)
VALUES
    (1, 'Colombia', 'https://flagcdn.com/co.svg', 'john.doe@test.com', 'John Doe', '2134234553'),
    (2, 'United States', 'https://flagcdn.com/us.svg', 'sarah.smith@test.com', 'Sarah Smith', '8765432109'),
    (3, 'Spain', 'https://flagcdn.com/es.svg', 'carlos.garcia@test.com', 'Carlos García', '5432167890'),
    (4, 'France', 'https://flagcdn.com/fr.svg', 'marie.dupont@test.com', 'Marie Dupont', '3456789012'),
    (5, 'Germany', 'https://flagcdn.com/de.svg', 'hans.mueller@test.com', 'Hans Müller', '6789012345'),
    (6, 'Brazil', 'https://flagcdn.com/br.svg', 'ana.silva@test.com', 'Ana Silva', '9012345678'),
    (7, 'United Kingdom', 'https://flagcdn.com/gb.svg', 'james.wilson@test.com', 'James Wilson', '2345678901'),
    (8, 'Italy', 'https://flagcdn.com/it.svg', 'giulia.rossi@test.com', 'Giulia Rossi', '4567890123'),
    (9, 'Japan', 'https://flagcdn.com/jp.svg', 'yuki.tanaka@test.com', 'Yuki Tanaka', '7890123456'),
    (10, 'Australia', 'https://flagcdn.com/au.svg', 'emma.brown@test.com', 'Emma Brown', '1234567890'),
    (11, 'Canada', 'https://flagcdn.com/ca.svg', 'michael.lee@test.com', 'Michael Lee', '5678901234'),
    (12, 'Mexico', 'https://flagcdn.com/mx.svg', 'sofia.martinez@test.com', 'Sofía Martínez', '8901234567'),
    (13, 'Argentina', 'https://flagcdn.com/ar.svg', 'lucas.fernandez@test.com', 'Lucas Fernández', '3210987654'),
    (14, 'Netherlands', 'https://flagcdn.com/nl.svg', 'eva.jong@test.com', 'Eva de Jong', '6543210987'),
    (15, 'Sweden', 'https://flagcdn.com/se.svg', 'anders.svensson@test.com', 'Anders Svensson', '9876543210'),
    (16, 'Portugal', 'https://flagcdn.com/pt.svg', 'joao.santos@test.com', 'João Santos', '1357924680'),
    (17, 'South Korea', 'https://flagcdn.com/kr.svg', 'min.kim@test.com', 'Min-jun Kim', '2468013579'),
    (18, 'Ireland', 'https://flagcdn.com/ie.svg', 'liam.murphy@test.com', 'Liam Murphy', '8024681357');

-- ============================================
-- CABINS DATA (8 cabins)
-- ============================================
INSERT INTO `cabin`(`id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`, `image`)
VALUES
    (1, 'cabin-001', 'Cozy mountain cabin with stunning valley views', 0, 2, 150, '2025-01-15 10:30:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.04700970822698769-c001.webp'),
    (2, 'cabin-002', 'Romantic lakeside retreat perfect for couples', 0, 2, 180, '2025-01-20 11:00:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.8090327447363388-c002.webp'),
    (3, 'cabin-003', 'Family-friendly cabin with modern amenities', 0, 4, 250, '2025-02-05 09:15:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.8277076561659449-c003.webp'),
    (4, 'cabin-004', 'Spacious woodland cabin with fireplace', 0, 4, 280, '2025-02-10 14:45:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.8923284972985251-c004.webp'),
    (5, 'cabin-005', 'Large luxury cabin with panoramic windows', 0, 6, 400, '2025-03-01 08:30:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.5872226515187394-c005.webp'),
    (6, 'cabin-006', 'Deluxe cabin with hot tub and BBQ area', 0, 7, 450, '2025-03-15 16:20:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.5898842277992791-c006.webp'),
    (7, 'cabin-007', 'Charming rustic cabin near hiking trails', 0, 3, 200, '2025-04-01 12:00:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.07002962139122304-c007.webp'),
    (8, 'cabin-008', 'Modern cabin with smart home features', 0, 5, 350, '2025-04-20 13:30:00.000000', 'http://localhost:8080/api/v1/storage/public/cabin/0.7344577586827514-c008.webp');

-- ============================================
-- BOOKINGS DATA (18 bookings, one per guest)
-- At least 3 with start_date >= today (2025-10-13)
-- Stay duration: 2-5 days
-- ============================================
INSERT INTO `booking`(`id`, `guest_id`, `is_paid`, `num_guests`, `created_at`, `start_date`, `end_date`, `status`)
VALUES
    -- Past bookings (14 bookings: 4 older + 6 within 30 days + 4 within 7 days)
    (1, 1, TRUE, 2, '2025-09-15 14:00:00.000000', '2025-09-27 14:00:00.000000', '2025-09-30 14:00:00.000000', 'CHECKED_OUT'),
    (2, 2, TRUE, 1, '2025-08-27 14:00:00.000000', '2025-09-05 14:00:00.000000', '2025-09-08 14:00:00.000000', 'CHECKED_OUT'),
    (3, 3, TRUE, 4, '2025-09-16 14:00:00.000000', '2025-09-22 14:00:00.000000', '2025-09-24 14:00:00.000000', 'CHECKED_OUT'),
    (4, 4, TRUE, 2, '2025-08-26 14:00:00.000000', '2025-09-01 14:00:00.000000', '2025-09-06 14:00:00.000000', 'CHECKED_OUT'),

    -- Recent past bookings (within 30 days before today: Sept 13 - Oct 12)
    (13, 13, TRUE, 3, '2025-10-31 14:00:00.000000', '2025-11-08 14:00:00.000000', '2025-11-11 14:00:00.000000', 'CHECKED_OUT'),
    (14, 14, TRUE, 2, '2025-10-29 14:00:00.000000', '2025-11-05 14:00:00.000000', '2025-11-07 14:00:00.000000', 'CHECKED_OUT'),
    (15, 15, TRUE, 4, '2025-10-20 14:00:00.000000', '2025-11-03 14:00:00.000000', '2025-11-07 14:00:00.000000', 'CHECKED_OUT'),
    (16, 16, TRUE, 2, '2025-10-26 14:00:00.000000', '2025-11-01 14:00:00.000000', '2025-11-04 14:00:00.000000', 'CHECKED_OUT'),
    (17, 17, TRUE, 5, '2025-10-25 14:00:00.000000', '2025-11-02 14:00:00.000000', '2025-11-07 14:00:00.000000', 'CHECKED_OUT'),
    (18, 18, TRUE, 3, '2025-10-26 14:00:00.000000', '2025-11-08 14:00:00.000000', '2025-11-11 14:00:00.000000', 'CHECKED_OUT'),

    -- Bookings within 7 days before today (Oct 6 - Oct 12)
    (5, 5, FALSE, 3, '2025-11-09 14:00:00.000000', '2025-11-21 14:00:00.000000', '2025-11-26 14:00:00.000000', 'CHECKED_OUT'),
    (6, 6, FALSE, 5, '2025-11-20 14:00:00.000000', '2025-11-28 14:00:00.000000', '2025-12-02 14:00:00.000000', 'UNCONFIRMED'),
    (7, 7, FALSE, 2, '2025-11-15 14:00:00.000000', '2025-11-28 14:00:00.000000', '2025-12-01 14:00:00.000000', 'UNCONFIRMED'),
    (8, 8, FALSE, 4, '2025-11-16 14:00:00.000000', '2025-11-28 14:00:00.000000', '2025-11-30 14:00:00.000000', 'UNCONFIRMED'),

    -- Future bookings (4 bookings starting from today or later)
    (9, 9, FALSE, 3, '2025-11-27 14:00:00.000000', '2025-12-10 14:00:00.000000', '2025-12-12 14:00:00.000000', 'UNCONFIRMED'),
    (10, 10, FALSE, 2, '2025-12-07 14:00:00.000000', '2025-12-21 14:00:00.000000', '2025-12-23 14:00:00.000000', 'UNCONFIRMED'),
    (11, 11, FALSE, 7, '2025-12-14 14:00:00.000000', '2025-12-26 14:00:00.000000', '2025-12-29 14:00:00.000000', 'UNCONFIRMED'),
    (12, 12, FALSE, 4, '2025-12-27 14:00:00.000000', '2026-01-11 14:00:00.000000', '2026-01-13 14:00:00.000000', 'UNCONFIRMED');

-- ============================================
-- BOOKING-CABINS RELATIONSHIPS
-- Assigning cabins based on guest capacity needs
-- ============================================
INSERT INTO `booking_cabin`(`booking_id`, `cabin_id`)
VALUES
    (1, 1),   -- 2 guests -> cabin-001 (capacity 2)
    (2, 2),   -- 1 guest -> cabin-002 (capacity 2)
    (3, 3),   -- 4 guests -> cabin-003 (capacity 4)
    (4, 1),   -- 2 guests -> cabin-001 (capacity 2)
    (5, 7),   -- 3 guests -> cabin-007 (capacity 3)
    (6, 5),   -- 5 guests -> cabin-005 (capacity 6)
    (7, 2),   -- 2 guests -> cabin-002 (capacity 2)
    (8, 4),   -- 4 guests -> cabin-004 (capacity 4)
    (9, 7),   -- 3 guests -> cabin-007 (capacity 3)
    (10, 1),  -- 2 guests -> cabin-001 (capacity 2)
    (11, 6),  -- 6 guests -> cabin-006 (capacity 7)
    (12, 3),  -- 4 guests -> cabin-003 (capacity 4)
    (13, 7),  -- 3 guests -> cabin-007 (capacity 3)
    (14, 2),  -- 2 guests -> cabin-002 (capacity 2)
    (15, 4),  -- 4 guests -> cabin-004 (capacity 4)
    (16, 1),  -- 2 guests -> cabin-001 (capacity 2)
    (17, 8),  -- 5 guests -> cabin-008 (capacity 5)
    (18, 7);  -- 3 guests -> cabin-007 (capacity 3)