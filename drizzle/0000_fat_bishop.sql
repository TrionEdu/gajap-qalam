CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`work_id` text NOT NULL,
	`display_name` text NOT NULL,
	`rating` integer NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`status_code_hash` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`title` text NOT NULL,
	`participant_name` text NOT NULL,
	`pen_name` text,
	`age` integer NOT NULL,
	`city` text NOT NULL,
	`school` text NOT NULL,
	`direction` text NOT NULL,
	`language` text NOT NULL,
	`summary` text NOT NULL,
	`parent_name` text NOT NULL,
	`parent_email` text NOT NULL,
	`parent_phone` text NOT NULL,
	`mentor` text,
	`consent_processing` integer NOT NULL,
	`consent_publication` integer NOT NULL,
	`file_key` text NOT NULL,
	`file_name` text NOT NULL,
	`file_size` integer NOT NULL,
	`cover_key` text,
	`correction_note` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `works` (
	`id` text PRIMARY KEY NOT NULL,
	`submission_id` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`author_name` text NOT NULL,
	`city` text NOT NULL,
	`age_group` text NOT NULL,
	`direction` text NOT NULL,
	`language` text NOT NULL,
	`summary` text NOT NULL,
	`file_key` text NOT NULL,
	`cover_key` text,
	`featured` integer DEFAULT false NOT NULL,
	`view_count` integer DEFAULT 0 NOT NULL,
	`published_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `works_submission_id_unique` ON `works` (`submission_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `works_slug_unique` ON `works` (`slug`);