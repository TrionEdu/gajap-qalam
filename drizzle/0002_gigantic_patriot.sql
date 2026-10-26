ALTER TABLE `publications` ADD `category` text DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE `publications` ADD `series_label` text;--> statement-breakpoint
ALTER TABLE `publications` ADD `is_new` integer DEFAULT true NOT NULL;