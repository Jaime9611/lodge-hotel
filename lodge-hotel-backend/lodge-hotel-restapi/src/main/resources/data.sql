-- GUESTS DATA
INSERT INTO `guest`(`id`, `country`, `country_flag`, `email`, `full_name`, `national_id`)
    VALUES (1,'Colombia','CO','john10@test.com','John Doe','2134234553');
INSERT INTO `guest`(`id`, `country`, `country_flag`, `email`, `full_name`, `national_id`)
    VALUES (2,'Colombia','CO','johana20@test.com','Johana Sinclair','2334234232');
INSERT INTO `guest`(`id`, `country`, `country_flag`, `email`, `full_name`, `national_id`)
    VALUES (3,'Colombia','CO','chris0@test.com','Chris Watson','33342343274');

-- CABINS DATA
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (1,'cabin-001','Cabin Descrip', 0, 4, 200, '2025-08-03 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (2,'cabin-002','Cabin Descrip', 0, 3, 200, '2025-08-14 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (3,'cabin-003','Cabin Descrip', 0, 2, 300, '2025-08-12 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (4,'cabin-004','Cabin Descrip', 0, 4, 200, '2025-08-19 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (5,'cabin-005','Cabin Descrip', 0, 4, 500, '2025-08-10 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (6,'cabin-006','Cabin Descrip', 0, 3, 200, '2025-08-19 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (7,'cabin-007','Cabin Descrip', 0, 4, 500, '2025-08-05 14:30:45.123456');
INSERT INTO `cabin`( `id`, `name`, `description`, `discount`, `max_capacity`, `regular_price`, `created_at`)
    VALUES (8,'cabin-008','Cabin Descrip', 0, 4, 300, '2025-08-09 14:30:45.123456');


-- Bookings Data
INSERT INTO `booking`(`id`, `cabin_id`, `guest_id`, `has_breakfast`, `is_paid`, `num_guests`, `extras_price`, `created_at`, `start_date`, `end_date`, `status`)
    VALUES (1, 1, 1, FALSE, FALSE, 3, 50,'2025-08-19 08:00:00.123456', '2025-08-19 08:00:00.123456', '2025-08-22 08:00:00.123456','CHECKED_IN');
INSERT INTO `booking`(`id`, `cabin_id`, `guest_id`, `has_breakfast`, `is_paid`, `num_guests`, `extras_price`, `created_at`, `start_date`, `end_date`, `status`)
    VALUES (2, 2, 2, TRUE, TRUE, 2, 60, '2025-08-18 08:00:00.123456','2025-08-18 08:00:00.123456', '2025-08-22 08:00:00.123456', 'CHECKED_OUT');
INSERT INTO `booking`(`id`, `cabin_id`, `guest_id`, `has_breakfast`, `is_paid`, `num_guests`, `extras_price`, `created_at`, `start_date`, `end_date`, `status`)
    VALUES (3, 7, 3, TRUE, FALSE, 4, 40, '2025-08-17 08:00:00.123456','2025-08-17 08:00:00.123456', '2025-08-22 08:00:00.123456', 'UNCONFIRMED');
