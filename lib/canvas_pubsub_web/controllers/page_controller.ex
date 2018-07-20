defmodule CanvasPubsubWeb.PageController do
  use CanvasPubsubWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
