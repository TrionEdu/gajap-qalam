CREATE TABLE `publication_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`publication_id` text NOT NULL,
	`display_name` text NOT NULL,
	`rating` integer NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `publications` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`description` text NOT NULL,
	`author_label` text NOT NULL,
	`language` text NOT NULL,
	`issue_label` text,
	`full_key` text NOT NULL,
	`preview_key` text NOT NULL,
	`cover_key` text,
	`price_kzt` integer DEFAULT 0 NOT NULL,
	`preview_pages` integer DEFAULT 3 NOT NULL,
	`page_count` integer NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`rights_confirmed` integer DEFAULT false NOT NULL,
	`view_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`published_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `publications_slug_unique` ON `publications` (`slug`);--> statement-breakpoint
CREATE TABLE `purchases` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`publication_id` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`amount_kzt` integer NOT NULL,
	`provider` text,
	`provider_payment_id` text,
	`purchased_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `purchases_user_publication_unique` ON `purchases` (`user_id`,`publication_id`);--> statement-breakpoint
CREATE TABLE `reading_progress` (
	`user_id` text NOT NULL,
	`publication_id` text NOT NULL,
	`page` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `publication_id`)
);
