module ReactHelper

  def react_universal_component_tags
    exports = @sea_otter_exports || {}
    scripts = exports['scripts'] || []

    tags = scripts.map {|tag| "<script src='/#{tag}'></script>"}

    tags.join("\n")&.html_safe
  end

  def styled_components_tags
    exports = @sea_otter_exports || {}

    exports['styles']&.html_safe
  end
end