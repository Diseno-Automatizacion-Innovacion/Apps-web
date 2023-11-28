<?php
/*
Plugin Name: Rub Forum
Description: Añade un endpoint para la api de los foros.
Version: 0.3
Author: https://ruben.garcalia.com
*/

function rub_forum_activation() {
    global $wpdb;

    /* ---------------------------- Create categories --------------------------- */
    $categories_table = $wpdb->prefix . 'rub_forum_categories';
    $sql_categories = "CREATE TABLE $categories_table (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL,
        author INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author) REFERENCES wp_users(ID)
    ) $charset_collate;";
    dbDelta($sql_categories);

    /* ------------------------------ Create posts ------------------------------ */
    $posts_table = $wpdb->prefix . 'rub_forum_posts';
    $sql_posts = "CREATE TABLE $posts_table (
        post_id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        user_id INT NOT NULL,
        post_content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES $categories_table(category_id),
        FOREIGN KEY (user_id) REFERENCES wp_users(ID)
    ) $charset_collate;";
    dbDelta($sql_posts);
}

// Añade un endpoint personalizado en la API
function rub_forum_add_endpoint() {
    add_rewrite_rule('^wp-json/forum/?$', 'index.php?forum=1', 'top');
}

// Registra la acción durante la inicialización de WordPress
add_action('init', 'rub_forum_add_endpoint');

// Añade la variable de consulta para el endpoint
function rub_forum_query_vars($vars) {
    $vars[] = 'forum';
    return $vars;
}

// Registra la acción para añadir la variable de consulta
add_filter('query_vars', 'rub_forum_query_vars');

// Registra el endpoint principal en la API de WordPress
function rub_forum_register_api_endpoint() {
    register_rest_route('rub-forum/v1', '/forum/categories', array(
        'methods'  => array('GET', 'POST'),
        'callback' => 'rub_forum_categories_endpoint_handler',
    ));

    register_rest_route('rub-forum/v1', '/forum/posts/(?P<id>\d+)?', array(
        'methods'  => array('GET', 'POST'),
        'callback' => 'rub_forum_posts_endpoint_handler',
    ));

}

// Registra la acción para añadir el endpoint principal y la ruta adicional a la API de WordPress
add_action('rest_api_init', 'rub_forum_register_api_endpoint');

// Manejador del endpoint principal
function rub_forum_categories_endpoint_handler($request) {
    global $wpdb;
    $table = $wpdb->prefix . 'rub_forum_categories';

    $method = $request->get_method();
    $id = $request->get_param('id');

    /* ----------------------------- Handle de POST ----------------------------- */
    if ($method == 'POST') {
        $data = $request->get_json_params();
        $userId = get_current_user_id();

        if ($userId !== 0) {
            $name = sanitize_text_field($data->name);
            
            $success = $wpdb->insert(
                $table,
                array(
                    'category_name' => $name,
                    'author' => $userId
                )
            );

            if ($success == TRUE) {
                $post_id = $wpdb->insert_id;
                $query = $wpdb->prepare("SELECT * FROM $table WHERE id = %d", $post_id);
                $results = $wpdb->get_results($query, ARRAY_A);

                wp_send_json(json_encode($results));
            }
            else {
                wp_send_json(json_encode(array(
                    'error' => 'Hubo un error procesando la informacion'
                )));
            }
        }

        else {
            return wp_send_json(json_encode(array('error' => 'Usuario no autenticado')));
        }
    }

    if ($method == 'GET') {
        if ($id !== null) {
            $query = "SELECT * FROM $table";
            $results = $wpdb->get_results($query, ARRAY_A);

            wp_send_json(json_encode($results));
        }
        else {
            $query = $wpdb->prepare("SELECT * FROM $table WHERE id = %d", $id);
            $results = $wpdb->get_results($query, ARRAY_A);

            wp_send_json(json_encode($results));
        }
    }
}

// Manejador de la ruta adicional
function rub_forum_posts_endpoint_handler($request) {

    
}
