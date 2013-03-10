<?php
namespace Slim\Extras\Views;

/**
 * LLView
 */
class LLView extends \Slim\View {
	/**
	 * Renders a template using LLView.php.
	 *
	 * @see View::render()
     * @throws RuntimeException If Haml lib directory does not exist.
	 * @param string $template The template name specified in Slim::render()
	 * @return string
	 */
	public function render($template) {
        require_once realpath(dirname(__FILE__) . '/../../../../LLView.class.php');
		$view = \LLView::load($template);
		
		if($this->data['__fetch'] === true) {
			$doc = $view->fetch($this->data);
			$this->data['__doc'] = $doc;
		}
		
		return $view->render($this->data);
	}
}
?>