<?php
/*
Plugin Name: Rub Forum
Description: Añade un endpoint para la api de los foros.
Version: 0.3
Author: https://ruben.garcalia.com
*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once ABSPATH . 'wp-admin/includes/upgrade.php';

function rub_forum_activation()
{
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();


    /* ---------------------------- Create categories --------------------------- */
    $categories_table = $wpdb->prefix . 'rub_forum_categories';
    $sql_categories = "CREATE TABLE $categories_table (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL,
        author BIGINT UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author) REFERENCES wp_users(ID)
    ) $charset_collate;";
    dbDelta($sql_categories);

    /* ------------------------------ Create posts ------------------------------ */
    $posts_table = $wpdb->prefix . 'rub_forum_posts';
    $sql_posts = "CREATE TABLE $posts_table (
        post_id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        user_id BIGINT UNSIGNED NOT NULL,
        post_content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES $categories_table(category_id),
        FOREIGN KEY (user_id) REFERENCES wp_users(ID)
    ) $charset_collate;";
    dbDelta($sql_posts);
}

register_activation_hook(__FILE__, 'rub_forum_activation');

// Añade un endpoint personalizado en la API
function rub_forum_add_endpoint()
{
    add_rewrite_rule('^wp-json/forum/?$', 'index.php?forum=1', 'top');
}

// Registra la acción durante la inicialización de WordPress
add_action('init', 'rub_forum_add_endpoint');

// Añade la variable de consulta para el endpoint
function rub_forum_query_vars($vars)
{
    $vars[] = 'forum';
    return $vars;
}

// Registra la acción para añadir la variable de consulta
add_filter('query_vars', 'rub_forum_query_vars');

// Registra los endpoints en la API de WordPress
function rub_forum_register_api_endpoint()
{
    // Aunque esta marcado como opcional, estan duplicados por que decia que no se encontraba
    register_rest_route('rub-forum/v1', '/categories/(?P<id>\d+)?', array(
        'methods'  => array('GET'),
        'callback' => 'rub_forum_categories_endpoint_handler',
    ));

    register_rest_route('rub-forum/v1', '/categories', array(
        'methods'  => array('GET', 'POST'),
        'callback' => 'rub_forum_categories_endpoint_handler',
    ));

    register_rest_route('rub-forum/v1', '/posts/(?P<category>\d+)?', array(
        'methods'  => array('GET', 'POST'),
        'callback' => 'rub_forum_posts_endpoint_handler',
    ));

    register_rest_route('rub-forum/v1', '/posts', array(
        'methods'  => array('GET'),
        'callback' => 'rub_forum_posts_endpoint_handler',
    ));
}

// Añade los endpoints
add_action('rest_api_init', 'rub_forum_register_api_endpoint');


function rub_forum_categories_endpoint_handler($request)
{
    global $wpdb;
    $table = $wpdb->prefix . 'rub_forum_categories';

    $method = $request->get_method();
    $id = $request->get_param('id');

    /* ----------------------------- Handle de POST ----------------------------- */
    if ($method == 'POST') {
        $data = $request->get_json_params();
        $userId = get_current_user_id();

        if ($userId !== 0) {
            $name = sanitize_text_field($data['name']);

            if ($name == null) {
                wp_send_json(array(
                    'error' => "Hubo un error procesando la informacion"
                ));
            }

            $success = $wpdb->insert(
                $table,
                array(
                    'category_name' => $name,
                    'author' => $userId
                )
            );

            if ($success == TRUE) {
                $post_id = $wpdb->insert_id;
                $query = $wpdb->prepare("SELECT * FROM $table WHERE category_id = %d", $post_id);
                $results = $wpdb->get_results($query, ARRAY_A);

                wp_send_json($results);
            } else {
                wp_send_json(array(
                    'error' => "Hubo un error procesando la informacion"
                ));
            }
        } else {
            return wp_send_json(json_encode(array('error' => 'Usuario no autenticado')));
        }
    }

    /* ------------------------------ Handle de Get ----------------------------- */
    if ($method == 'GET') {
        if ($id !== null) {
            $query = $wpdb->prepare("SELECT * FROM $table WHERE category_id = %d", $id);
            $results = $wpdb->get_results($query, ARRAY_A);

            wp_send_json($results);
        } else {
            $query = "SELECT * FROM $table";
            $results = $wpdb->get_results($query, ARRAY_A);

            wp_send_json($results);
        }
    }
}


function rub_forum_posts_endpoint_handler($request)
{
    global $wpdb;
    $table = $wpdb->prefix . 'rub_forum_posts';

    $method = $request->get_method();
    $category = $request->get_param('category');

    /* ----------------------------- Handle de POST ----------------------------- */
    if ($method == 'POST') {
        $data = $request->get_json_params();
        $userId = get_current_user_id();

        if ($userId !== 0) {
            $content = sanitize_text_field($data['content']);

            if ($content == null) {
                wp_send_json(array(
                    'error' => "Hubo un error procesando la informacion"
                ));
            }

            $success = $wpdb->insert(
                $table,
                array(
                    'post_content' => $content,
                    'user_id' => $userId,
                    'category_id' => $category
                )
            );

            if ($success == TRUE) {
                $post_id = $wpdb->insert_id;
                $query = $wpdb->prepare("SELECT * FROM $table WHERE post_id = %d", $post_id);
                $results = $wpdb->get_results($query, ARRAY_A);

                wp_send_json($results);
            } else {
                $content = sanitize_text_field($data['content']);
                wp_send_json(array(
                    'error' => "Hubo un error procesando la informacion $content"
                ));
            }
        } else {
            return wp_send_json(json_encode(array('error' => 'Usuario no autenticado')));
        }
    }

    /* ------------------------------ Handle de GET ----------------------------- */
    if ($method == 'GET') {
        if ($category !== null) {
            $query = $wpdb->prepare("SELECT * FROM $table WHERE category_id = %d", $category);
            $results = $wpdb->get_results($query, ARRAY_A);

            wp_send_json($results);
        } else {
            $query = "SELECT * FROM $table";
            $results = $wpdb->get_results($query, ARRAY_A);

            wp_send_json($results);
        }
    }
}
